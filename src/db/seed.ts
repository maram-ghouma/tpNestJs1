import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AppDataSource } from './data-source'; // The DataSource you created
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';

async function bootstrap() {
  // Initialize the DataSource (connect to the database)
  await AppDataSource.initialize();

  // Get the repositories from the DataSource
  const userRepository = AppDataSource.getRepository(User);
  const cvRepository = AppDataSource.getRepository(Cv);
  const skillRepository = AppDataSource.getRepository(Skill);

  // Create Skills
  const skillNestJS = skillRepository.create({ designation: 'NestJS' });
  const skillDotNet = skillRepository.create({ designation: '.NET' });
  const skillPython = skillRepository.create({ designation: 'Python' });
  const skillLinux = skillRepository.create({ designation: 'Linux' });
  const skillGitHub = skillRepository.create({ designation: 'GitHub' });

  // Save the skills to the database
  await skillRepository.save([skillNestJS, skillDotNet, skillPython, skillLinux, skillGitHub]);

  console.log('Skills seeded');

  // Create User 1
  const user1 = userRepository.create({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  });

  // Create User 2
  const user2 = userRepository.create({
    username: 'jane_doe',
    email: 'jane@example.com',
    password: 'password456',
  });

  // Save the users to the database
  await userRepository.save([user1, user2]);

  console.log('Users seeded');

  // Create CV 1 for User 1 and assign skills
  const cv1 = cvRepository.create({
    name: 'Doe',
    firstname: 'John',
    age: 30,
    Cin: '123456789',
    Job: 'Software Developer',
    path: '/path/to/cv1',
    user: user1,
    skills: [skillNestJS, skillDotNet, skillPython],
  });

  // Create CV 2 for User 1 and assign skills
  const cv2 = cvRepository.create({
    name: 'Doe',
    firstname: 'John',
    age: 30,
    Cin: '987654321',
    Job: 'Backend Developer',
    path: '/path/to/cv2',
    user: user1,
    skills: [skillLinux, skillGitHub],
  });

  // Create CV for User 2 and assign skills
  const cv3 = cvRepository.create({
    name: 'Doe',
    firstname: 'Jane',
    age: 28,
    Cin: '112233445',
    Job: 'Data Scientist',
    path: '/path/to/cv3',
    user: user2,
    skills: [skillPython, skillLinux, skillGitHub],
  });

  // Save the CVs to the database
  await cvRepository.save([cv1, cv2, cv3]);

  console.log('CVs seeded');
}

bootstrap().catch((error) => console.log('Error seeding data: ', error));
