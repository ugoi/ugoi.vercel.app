// This extends the Window interface to include FirebaseService2Mock
declare global {
  interface Window {
    FirebaseService2Mock: typeof FirebaseService2Mock;
  }
}

class FirebaseService2Mock {
  private static settings: any; // Adjust the type as needed
  private static readonly cloudFunctionUrl: string =
    import.meta.env.VITE_APP_API_COMPLETE_USER_PROFILE || "";
  private static readonly cloudFunctionUrlAuthToken: string =
    import.meta.env.VITE_APP_GENERATE_COMETCHAT_AUTH_TOKEN || "";

  public static async init(settings?: any): Promise<any> {
    FirebaseService2Mock.settings = settings;
    return Promise.resolve();
  }

  static async getAuthToken(): Promise<string> {
    // Simulate fetching an auth token
    console.log("Mock: Fetching CometChat auth token");
    return Promise.resolve("r4w7qefgkvux5viuodokkjv8whh2");
  }

  public static async completeUserProfile(): Promise<string> {
    // Simulate completing user profile
    console.log("Mock: Completing user profile");
    return Promise.resolve("UserProfileCompleted");
  }

  public static async getCurrentUser(): Promise<any | null> {
    // Simulate fetching the current user
    console.log("Mock: Fetching current user");
    const mockUser = {
      uid: "mockUid",
      email: "user@example.com",
      displayName: "Mock User",
    };
    return Promise.resolve(mockUser);
  }

  async deleteApp(): Promise<string> {
    // Simulate deleting the Firebase app
    console.log("Mock: Deleting Firebase app");
    return Promise.resolve("AppDeleted");
  }
}

window.FirebaseService2Mock = FirebaseService2Mock;

export { FirebaseService2Mock };
