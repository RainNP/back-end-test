export type UserResponse = {
  id: string;
  name: string;
  profileImage: string;
  status: boolean;
}

export type UserCreateRequest = {
  name: string;
};
