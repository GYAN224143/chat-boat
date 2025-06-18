// Mock API service
export const apiLogin = async (email: string, password: string) => {
  // In a real app, this would call your backend
  return new Promise<{ user: string; token: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        user: email,
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
      });
    }, 500);
  });
};

export const apiRegister = async (email: string, password: string) => {
  return apiLogin(email, password);
};

export const sendMessage = async (message: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`This is a mock response to: "${message}"`);
    }, 1000);
  });
};
