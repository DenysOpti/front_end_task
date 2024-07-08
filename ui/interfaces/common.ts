export interface MessageInterface {
  role: string;
  content: string;
}
export interface RegisterPayloadInterface {
  email: string;
  password: string;
}
export interface LoginPayloadInterface {
  username: string;
  password: string;
}
export interface PromptInterface {
  type: string;
  content: string;
}
export interface SelectInterface {
  value: string;
  label: string;
}
