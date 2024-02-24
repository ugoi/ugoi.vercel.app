import { Timestamp } from "firebase/firestore";

export type SendMessageServiceParams = {
  message: string;
  conversationId: string;
};

export type Message = {
  createdAt: Timestamp;
  id: string;
  photoURL: string;
  room: string;
  text: string;
  userName: string;
  userUid: string;
};

// AdminUserRole type to represent the role structure
export type AdminUserRole = {
  isAdmin: boolean;
  isMember: boolean;
};

// AdminUser type to represent the admin user object structure
export type AdminUser = {
  displayName: string;
  role: AdminUserRole;
  photoURL: string;
  uid: string;
};

export type Conversation = {
  conversationId: string;
  name: string; // the name of the last sender or the admin
  lastSenderName: string; // the name of the last sender
  info: string; // the last message text or a default info text
  avatarSrc: string; // URL to the last sender's avatar or the admin's avatar
  status: string; // e.g. 'online', 'offline', etc.
};
