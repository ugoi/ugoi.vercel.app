import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Adjust the import path as needed

export async function checkRoomExistenceWithSameUsers(userIds: string[]) {
  // Fetch rooms for each user and store them in an array
  const allUserRooms = await Promise.all(
    userIds.map(async (userId) => {
      const userRoomsRef = doc(db, "userRooms", userId);
      const userRoomsDoc = await getDoc(userRoomsRef);

      if (userRoomsDoc.exists()) {
        return Object.keys(userRoomsDoc.data());
      }
      return [];
    })
  );

  // Find the common rooms among all users
  const commonRooms = allUserRooms.reduce((common, userRooms, index) => {
    if (index === 0) {
      return new Set(userRooms);
    }
    return new Set(userRooms.filter(roomId => common.has(roomId)));
  }, new Set());

  // Check if there is at least one common room
  return commonRooms.size > 0;
}
