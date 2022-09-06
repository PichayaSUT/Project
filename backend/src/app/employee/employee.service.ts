import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';
import { TEmployee } from './interface/employee.interface';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private authService: AuthService,
  ) { }
  // function create เอง
  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<TEmployee> {
    const { email, password } = createEmployeeDto;
    const query = await this.employeeRepository.findOne({
      where: { email: email },
    });
    if (query) {
      throw new HttpException(
        'Employee already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    // example of how to use the repository
    const employee = new Employee();
    employee.email = email;
    employee.password = password;
    // change data
    employee.first_name = 'Ittikorn';
    employee.last_name = 'chawkamud';
    employee.phone = '0935281333';
    employee.nickname = 'dodo';
    employee.createdBy = 'admin';
    return this.employeeRepository.save(employee);
  }
  create(user: TEmployee): Observable<TEmployee> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const employee = new Employee();
        employee.email = user.email;
        employee.password = passwordHash;
        employee.first_name = user.first_name;
        employee.last_name = user.last_name;
        employee.nickname = user.nickname;
        employee.phone = user.phone;
        // hard code
        employee.createdBy = 'dodo';
        // ปิดไว้เพื่อได้ใช้
        // employee.role = UserRole.USER;

        return from(this.employeeRepository.save(employee)).pipe(
          map((resultEmployee: TEmployee) => {
            const { password, ...result } = resultEmployee;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }
  login(user: TEmployee): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: TEmployee) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }
  validateUser(email: string, password: string): Observable<TEmployee> {
    return from(
      this.employeeRepository.findOne({
        where: { email: email },
      }),
    ).pipe(
      switchMap((user: TEmployee) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }
  // findAll() {
  //   return `This action returns all users`;
  // }
  // findByName(firstName: string, lastName: string) {
  //   return this.employeeRepository.findOne({
  //     where: {
  //       firstName,
  //       lastName,
  //     },
  //   });
  // }
  findOneByEmail(email: string):Observable<Employee> {
    return from(
      this.employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.first_name",
          "employee.last_name",
          "employee.nickname",
          "employee.email",
          "employee.password",
          "employee.phone",
          "employee.status"
        ])
        .where("employee.email = :email", { email })
        .getOne())
  }

  // updateById(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //   return `This action updates a #${id} user`;
  // }

  // removeById(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
