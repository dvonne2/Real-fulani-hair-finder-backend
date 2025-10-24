import { DataTypes, Sequelize, Model, Optional, ModelStatic } from 'sequelize';

export interface ProductAttributes {
  id: number;
  name: string;
  category: string;
  price_naira: number;
  targets_causes: string[]; // e.g., ['hormonal','traction']
  priority_level?: string | null;
  frequency?: string | null;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'priority_level' | 'frequency' | 'is_active' | 'createdAt' | 'updatedAt'
>;

export type ProductModel = Model<ProductAttributes, ProductCreationAttributes> & ProductAttributes;

export default function ProductFactory(sequelize: Sequelize): ModelStatic<Model<ProductAttributes, ProductCreationAttributes>> {
  const Product = sequelize.define<Model<ProductAttributes, ProductCreationAttributes>>(
    'Product',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      price_naira: { type: DataTypes.INTEGER, allowNull: false },
      targets_causes: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
      priority_level: { type: DataTypes.STRING, allowNull: true },
      frequency: { type: DataTypes.STRING, allowNull: true },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { tableName: 'products', timestamps: true }
  );
  return Product;
}
