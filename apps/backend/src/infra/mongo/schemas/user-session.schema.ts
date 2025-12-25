import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig, Types } from 'mongoose';
import { MongoUser } from './user.schema';

function parseDurationToSeconds(duration: string): number {
  const match = duration.match(/^(\d+)(s|m|h|d)$/);

  if (!match) {
    throw new Error(
      `Invalid duration format: ${duration}. Use formats like "14d", "24h", "30m", "60s"`,
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  return value * multipliers[unit];
}

const expirationString = process.env.JWT_REFRESH_TOKEN_EXPIRATION;

if (!expirationString) {
  throw new Error(
    'JWT_REFRESH_TOKEN_EXPIRATION environment variable is not set',
  );
}

const ttlSeconds = parseDurationToSeconds(expirationString);

@Schema({ timestamps: true, collection: 'sessions' })
export class MongoUserSession {
  @Prop({ required: true, type: Types.ObjectId, ref: MongoUser.name })
  user: string;

  @Prop()
  refreshToken: string;
}

export type UserSessionDocument = HydratedDocument<MongoUserSession> &
  SchemaTimestampsConfig;

export const UserSessionSchema = SchemaFactory.createForClass(MongoUserSession);

UserSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: ttlSeconds });
