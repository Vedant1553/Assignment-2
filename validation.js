export function validateTaskInput(input) {

  if (!input.trim()) {

    return {
      valid: false,
      message: 'Task cannot be empty'
    };
  }

  if (input.trim().length < 3) {

    return {
      valid: false,
      message: 'Task must contain at least 3 characters'
    };
  }

  if (input.trim().length > 50) {

    return {
      valid: false,
      message: 'Task cannot exceed 50 characters'
    };
  }

  return {
    valid: true,
    message: ''
  };
}