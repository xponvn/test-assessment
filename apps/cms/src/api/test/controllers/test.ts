/**
 * test controller
 */

import { factories } from '@strapi/strapi';
import isEmail from 'validator/lib/isEmail';
import _ from 'lodash';
import { emailTemplate } from '../../../template/email-invite-candidate';

export default factories.createCoreController(
  'api::test.test',
  ({ strapi }) => ({
    async sendTest(ctx) {
      try {
        const body = ctx.request.body;

        const emails = body?.['emails'];

        if (
          !emails ||
          emails.length === 0 ||
          !emails.every((e: string) => isEmail(e))
        ) {
          return ctx.send({ message: 'Please enter valid email!' }, 400);
        }

        await Promise.all(
          emails.map(async (email: string) => {
            await strapi.plugins['email'].services.email.sendTemplatedEmail(
              {
                to: email,
                from: process.env.SENDGRID_EMAIL_FROM,
                replyTo: process.env.SENDGRID_EMAIL_FROM,
              },
              emailTemplate,
              {
                candidate: _.startCase(_.toLower(email.split(/\.|@/)[0])),
              }
            );
          })
        );

        return ctx.send({ message: 'Invite candidate successfully!' }, 200);
      } catch (error) {
        console.log(error);
      }
    },
  })
);
