import mongoose, { Document } from 'mongoose';
import EmailValidator from 'email-validator';

interface User extends Document {
 email: string,
 password: string
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    minlength: 9,
    maxlength: 255,
    validate: [
      {
       validator: EmailValidator.validate,
       msg: 'Provide a valid email' 
      },
      {
        validator: async (email: string): Promise<boolean> => {
          const user: User | null  = await UserModel.findOne({email});
          return !user;
        },
        msg: 'Email already exists'
      }
    ]
  },
  password: {
    type: String, 
    required: true,
    minlength: 6,
    maxlength: 1024
  }
});

const UserModel = mongoose.model('User', userSchema);

export { User, UserModel, userSchema };