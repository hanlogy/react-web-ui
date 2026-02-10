import {
  Button,
  IconButton,
  IconWrapper,
  useForm,
} from '@hanlogy/react-web-ui';
import { CheckboxField, TextareaField, SelectField, TextField } from './inputs';
import { CloseIcon, PersonIcon } from '../../components/icons';
import { useState } from 'react';

interface FormData {
  name: string;
  description: string;
  level: string;
  agree: boolean;
}

export function FormPage() {
  const { handleSubmit, register, setFieldValue, setInitialValues } =
    useForm<FormData>();
  const [count, setCount] = useState(1);

  const onSubmit = (data: FormData) => {
    console.log(`Submit: ${JSON.stringify(data, null, 2)}`);
  };

  setInitialValues({});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <TextField
          label="Name"
          prefix={
            <IconWrapper>
              <PersonIcon className="text-gray-500" />
            </IconWrapper>
          }
          suffix={
            <IconButton
              onClick={() => setFieldValue('name', '')}
              className="text-gray-600 hover:text-red-600"
            >
              <CloseIcon />
            </IconButton>
          }
          placeholder="Your name"
          helper="Please enter your name"
          controller={register('name', {
            onValueChange: ({ name }) => {
              console.log(`name is: ${name}`);
            },
            validator: ({ name }) => {
              if (!name) {
                return 'Name cannot be empty';
              }
            },
          })}
        />
      </div>
      <div>
        <TextareaField
          label="Description"
          helper="Enter some text"
          controller={register('description', {})}
        />
      </div>
      <div>
        <SelectField
          label="Level"
          helper="Select a skill level"
          options={[
            { value: '', label: '' },
            { value: '1', label: 'Level 1' },
            { value: '2', label: 'Level 2' },
            { value: '3', label: 'Level 3' },
          ]}
          controller={register('level', {
            validator: ({ level }) => {
              if (!level) {
                return 'You must select a level';
              }
            },
            onValueChange: ({ level }) => {
              console.log(level);
            },
          })}
        />
      </div>

      <div>
        <CheckboxField
          label="I agree"
          helper="You must agree"
          controller={register('agree', {
            validator: ({ agree }) => {
              if (!agree) {
                return 'You must choose';
              }
            },
            onValueChange: ({ agree }) => {
              console.log(agree);
            },
          })}
        />
      </div>
      <div className="space-x-2">
        <Button className="border" type="submit">
          Save
        </Button>

        <Button
          onClick={() => setCount((e) => e + 1)}
          className="border border-gray-300 bg-gray-50 text-gray-600"
          type="button"
        >
          Count {count}
        </Button>
      </div>
    </form>
  );
}
