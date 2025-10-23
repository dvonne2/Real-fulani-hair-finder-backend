import { Sequelize, type Model, type ModelStatic } from 'sequelize';
import { sequelize } from '../config/database';
import QuizResultFactory, { type QuizResultAttributes, type QuizResultCreationAttributes } from './quizResult';
import ProductFactory, { type ProductAttributes, type ProductCreationAttributes } from './product';
import QuizSubmissionFactory, { type QuizSubmissionAttributes, type QuizSubmissionCreationAttributes } from './quizSubmission';
import UserProfileFactory, { type UserProfileAttributes, type UserProfileCreationAttributes } from './userProfile';

export const QuizResult = QuizResultFactory(sequelize) as ModelStatic<
  Model<QuizResultAttributes, QuizResultCreationAttributes>
>;

export const Product = ProductFactory(sequelize) as ModelStatic<
  Model<ProductAttributes, ProductCreationAttributes>
>;

export const QuizSubmission = QuizSubmissionFactory(sequelize) as ModelStatic<
  Model<QuizSubmissionAttributes, QuizSubmissionCreationAttributes>
>;

export const UserProfile = UserProfileFactory(sequelize) as ModelStatic<
  Model<UserProfileAttributes, UserProfileCreationAttributes>
>;

export type DB = {
  sequelize: Sequelize;
  QuizResult: typeof QuizResult;
  Product: typeof Product;
  QuizSubmission: typeof QuizSubmission;
  UserProfile: typeof UserProfile;
};

export const db: DB = {
  sequelize,
  QuizResult,
  Product,
  QuizSubmission,
  UserProfile,
};

export default db;
