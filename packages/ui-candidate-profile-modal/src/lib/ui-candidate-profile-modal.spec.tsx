import { render } from '@testing-library/react';

import UiCandidateProfileModal from './ui-candidate-profile-modal';

describe('UiCandidateProfileModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiCandidateProfileModal open />);
    expect(baseElement).toMatchSnapshot();
  });
});
