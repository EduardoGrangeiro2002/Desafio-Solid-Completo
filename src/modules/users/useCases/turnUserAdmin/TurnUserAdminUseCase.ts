import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const UserById = this.usersRepository.findById(user_id);
    if (!UserById.admin === true) {
      UserById.admin = true;
      return UserById;
    }
    throw new Error("Usuário ja é um admin");
  }
}

export { TurnUserAdminUseCase };
