import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/models/user.model';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const adminEmail = 'admin@algorizz.com';
    const adminPassword = 'admin123';

    const existingAdmin = await usersService.findByEmail(adminEmail);
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const admin = await usersService.create({
      firstName: 'Admin',
      lastName: 'User', 
      email: adminEmail,
      password: adminPassword,
      role: UserRole.ADMIN,
      employeeId: 'ALGORIZZ_ADMIN',
      phoneNumber: '9999999999',
      dateOfBirth: new Date().toISOString(),
      address: '123 Main St, Anytown, USA',
      designation: 'Admin',
      joiningDate: new Date().toISOString(),
      salary: '100000',
    });

    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 