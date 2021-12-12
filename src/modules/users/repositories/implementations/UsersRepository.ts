import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const userAlreadyExists = this.users.find(
      (userAlreadyExists) => userAlreadyExists.id === id
    );
    if (!userAlreadyExists) {
      throw new Error("Usuário não existe");
    }
    return userAlreadyExists;
  }

  findByEmail(email: string): User | undefined {
    const UserEmailExist = this.users.find(
      (UserEmailExist) => UserEmailExist.email === email
    );
    return UserEmailExist;
  }

  turnAdmin(receivedUser: User): User {
    const User = receivedUser;
    Object.assign(User, {
      updated_at: new Date(),
      admin: true,
    });
    return User;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
