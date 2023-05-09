import isEmail from 'validator/lib/isEmail';
import { getService } from '@strapi/plugin-users-permissions/server/utils';
import utils from '@strapi/utils';
import { emailTemplate } from '../../../template/email-invite-candidate';
import _ from 'lodash';

type IndividualTest = {
  email: string;
  linkTestInvite: string;
};

type Candidate = {
  firstName?: string;
  email: string;
  publishedAt: string;
};

const { ApplicationError } = utils.errors;

const validateEmails = (emails: string[]) => {
  if (!emails.every((e: string) => isEmail(e))) {
    return true;
  }

  return;
};

const validateTestId = async (testId: string) => {
  const testTemplate = await strapi.db
    .query('api::test.test')
    .findOne({ where: { id: testId } });

  if (!testTemplate) {
    return true;
  }
  return;
};

const getNonExistingCandidates = async (emails: string[]) => {
  try {
    const nonExistCandidates: Candidate[] = [];
    await Promise.all(
      emails.map(async (email: string) => {
        const candidate = await strapi.db
          .query('api::candidate.candidate')
          .findOne({ where: { email } });

        if (!candidate) {
          nonExistCandidates.push({
            firstName: email.split('@')[0],
            email,
            publishedAt: new Date().toISOString(),
          });
        }
      })
    );

    return nonExistCandidates;
  } catch (error) {
    throw new ApplicationError(error.message);
  }
};

const createManyCandidate = async (listCandidateToCreate: Candidate[]) => {
  try {
    if (listCandidateToCreate.length > 0) {
      await strapi.db.query('api::candidate.candidate').createMany({
        data: listCandidateToCreate,
      });
    }
  } catch (error) {
    throw new ApplicationError(error.message);
  }
};

const createIndividualTests = async (emails: string[], testId: string) => {
  try {
    await Promise.all(
      emails.map(async (email: string) => {
        // If current candidate already invited to inviting test - do nothing
        const isIndTestExist = await strapi.db
          .query('api::individual-test.individual-test')
          .findOne({
            where: {
              $and: [{ candidate: { email }, test: { id: testId } }],
            },
          });

        if (!isIndTestExist) {
          const currentCandidate = await strapi.db
            .query('api::candidate.candidate')
            .findOne({ where: { email } });

          // todo currently createMany doesn't work correctly, find a way to use
          await strapi.db.query('api::individual-test.individual-test').create({
            data: {
              test: testId,
              candidate: currentCandidate.id,
              publishedAt: new Date().toISOString(),
            },
          });
        }
      })
    );
  } catch (error) {
    throw new ApplicationError(error.message);
  }
};

const getIndTests = async (emails: string[], testId: string) => {
  try {
    const listOfIndTest = await Promise.all(
      emails.map(async (email: string) => {
        const indTest = await strapi.db
          .query('api::individual-test.individual-test')
          .findOne({
            where: {
              $and: [{ candidate: { email }, test: { id: testId } }],
            },
          });

        const token = getService('jwt').issue({
          individualTestId: indTest.id,
          SECRET_KEY: process.env.JWT_SECRET,
        });

        return {
          email,
          // todo replace with real link-test
          linkTestInvite: `http://localhost:4200/test/${testId}?token=${token}`,
        };
      })
    );

    return listOfIndTest;
  } catch (error) {
    throw new ApplicationError(error.message);
  }
};

const sendEmails = async (listOfIndTests: IndividualTest[]) => {
  await Promise.all(
    listOfIndTests.map(async (item) => {
      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: item.email,
          from: process.env.SENDGRID_EMAIL_FROM,
          replyTo: process.env.SENDGRID_EMAIL_FROM,
        },
        emailTemplate,
        {
          candidate: _.startCase(_.toLower(item.email.split(/\.|@/)[0])),
          linkTestInvite: item.linkTestInvite,
        }
      );
    })
  );
};

/**
 * HANDLE INVITE CANDIDATES
 * @param _
 * @param args
 */
export const inviteTest = async (_, args) => {
  const { testId, emails } = args;

  /**
   * validate testId and emails
   */

  if (await validateTestId(testId)) {
    return {
      status: 'failed',
      message: 'TestId is not valid.',
    };
  }

  if (validateEmails(emails)) {
    return {
      status: 'failed',
      message: 'Emails input is not valid.',
    };
  }

  /**
   * Check if candidate belong to email is exists then create non-exist candidate by the email
   */
  const listCandidateToCreate: Candidate[] = await getNonExistingCandidates(
    emails
  );
  await createManyCandidate(listCandidateToCreate);

  /**
   * Save data to Individual test
   */
  await createIndividualTests(emails, testId);

  /**
   * Send emails with link attached token
   */
  const listOfIndTests = await getIndTests(emails, testId);

  await sendEmails(listOfIndTests);

  return {
    status: 'success',
    message: 'Test sent successfully',
  };
};
