import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const UserAlreadyExist = this.usersRepository.findByEmail(email);
    if (UserAlreadyExist) {
      throw new Error("User already exist");
    }
    const user = this.usersRepository.create({ name, email });
    return user;
  }
}

export { CreateUserUseCase };
