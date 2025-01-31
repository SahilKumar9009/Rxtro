export const validateUserForm = data => {
  return new Promise(resolve => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let success = true;
    let message = '';
    let esMessage = '';
    if (!data.email) {
      success = false;
      message = 'Email is required';
      esMessage = 'Email is required ***';
    } else if (!re.test(data.email.trim())) {
      success = false;
      message = 'Invalid email I request you please enter valid email address';
      esMessage =
        'Invalid email I request you please enter valid email address ***';
    } else if (!data.password) {
      success = false;
      message = 'Password is required';
      esMessage = 'Password is required **';
    } else if (
      data.password.trim().length < 3 ||
      data.password.trim().length > 20
    ) {
      success = false;
      message = 'Password must be between 4 and 20 characters!';
      esMessage = 'Password must be between 4 and 20 characters! **';
    }
    resolve({
      status: success,
      message: message,
      esMessage: esMessage,
    });
  });
};
