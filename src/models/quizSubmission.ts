import { DataTypes, Sequelize, Model, Optional, ModelStatic } from 'sequelize';

export interface QuizSubmissionAttributes {
  id: number;
  user_email?: string | null;
  responses: object; // JSONB of q1..q15
  risk_level?: string | null;
  urgency?: string | null;
  pattern_type?: string | null;
  primary_cause?: string | null;
  primary_cause_confidence?: number | null;
  root_causes?: object | null; // array/object
  special_note?: string | null;
  recommendations?: object | null;
  action_plan?: object | null;
  education_priorities?: object | null;
  viewed_results?: boolean | null;
  purchased_products?: boolean | null;
  follow_up_sent?: boolean | null;
  viewed_at?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type QuizSubmissionCreationAttributes = Optional<
  QuizSubmissionAttributes,
  'id' | 'user_email' | 'risk_level' | 'urgency' | 'pattern_type' | 'primary_cause' | 'primary_cause_confidence' | 'root_causes' | 'special_note' | 'recommendations' | 'action_plan' | 'education_priorities' | 'viewed_results' | 'purchased_products' | 'follow_up_sent' | 'viewed_at' | 'createdAt' | 'updatedAt'
>;

export type QuizSubmissionModel = Model<QuizSubmissionAttributes, QuizSubmissionCreationAttributes> & QuizSubmissionAttributes;

export default function QuizSubmissionFactory(sequelize: Sequelize): ModelStatic<Model<QuizSubmissionAttributes, QuizSubmissionCreationAttributes>> {
  const QuizSubmission = sequelize.define<Model<QuizSubmissionAttributes, QuizSubmissionCreationAttributes>>(
    'QuizSubmission',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_email: { type: DataTypes.STRING, allowNull: true },
      responses: { type: DataTypes.JSONB, allowNull: false },
      risk_level: { type: DataTypes.STRING, allowNull: true },
      urgency: { type: DataTypes.STRING, allowNull: true },
      pattern_type: { type: DataTypes.STRING, allowNull: true },
      primary_cause: { type: DataTypes.STRING, allowNull: true },
      primary_cause_confidence: { type: DataTypes.INTEGER, allowNull: true },
      root_causes: { type: DataTypes.JSONB, allowNull: true },
      special_note: { type: DataTypes.TEXT, allowNull: true },
      recommendations: { type: DataTypes.JSONB, allowNull: true },
      action_plan: { type: DataTypes.JSONB, allowNull: true },
      education_priorities: { type: DataTypes.JSONB, allowNull: true },
      viewed_results: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      purchased_products: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      follow_up_sent: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      viewed_at: { type: DataTypes.DATE, allowNull: true },
    },
    { tableName: 'quiz_submissions', timestamps: true }
  );
  return QuizSubmission;
}
