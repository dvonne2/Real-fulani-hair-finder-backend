import { DataTypes, Sequelize, Model, Optional, ModelStatic } from 'sequelize';

export interface UserProfileAttributes {
  id: number;
  email: string;
  quiz_count: number;
  purchased_products?: object | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserProfileCreationAttributes = Optional<
  UserProfileAttributes,
  'id' | 'quiz_count' | 'purchased_products' | 'createdAt' | 'updatedAt'
>;

export type UserProfileModel = Model<UserProfileAttributes, UserProfileCreationAttributes> & UserProfileAttributes;

export default function UserProfileFactory(sequelize: Sequelize): ModelStatic<Model<UserProfileAttributes, UserProfileCreationAttributes>> {
  const UserProfile = sequelize.define<Model<UserProfileAttributes, UserProfileCreationAttributes>>(
    'UserProfile',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      quiz_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      purchased_products: { type: DataTypes.JSONB, allowNull: true },
    },
    { tableName: 'user_profiles', timestamps: true }
  );
  return UserProfile;
}
