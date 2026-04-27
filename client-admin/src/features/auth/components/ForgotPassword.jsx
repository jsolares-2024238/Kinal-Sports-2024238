import React from 'react';
import { LoginForm } from './LoginForm';
import { useForm } from 'react-hook-form';

export const ForgotPassword = ({ onSwitch }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form className='space-y-5'>
      <div>
        <input
          type='text'
          id='forgotPassword'
          placeholder='olvidelacontraseña@example.com'
          className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          {...register('forgotPassword', {
            required: 'Este campo no puede estar vació',
          })}
        />
        {errors.forgotpassword && (
          <p className='text-red-600 text-xs mt-1'>{errors.forgotpassword.message}</p>
        )}
      </div>

      <button
        type='submit'
        className='w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm '
      >
        Enviar
      </button>

      <div>
        <p className='text-center text-sm'>
          <button
            type='button'
            onClick={onSwitch}
            className='text-main-blue hover:underline  hover:cursor-pointer'
          >
            Regresar
          </button>
        </p>
      </div>
    </form>
  );
};
