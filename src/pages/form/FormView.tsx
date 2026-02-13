import {
  Button,
  clsx,
  IconButton,
  IconWrapper,
  useForm,
} from '@hanlogy/react-web-ui';
import {
  CheckboxField,
  TextareaField,
  SelectField,
  TextField,
} from './formFields';
import { CloseIcon, PersonIcon } from '../../components/icons';
import { useState, type SubmitEvent } from 'react';

interface FormData {
  name: 'a' | 'b' | '';
  description: string;
  level: string;
  agree: boolean;
}

export function FormView() {
  const { register, setFieldValue, validate, getValues } = useForm<FormData>();
  const [count, setCount] = useState(1);
  const [tab, setTab] = useState('detail');

  const handleSubmit = (e?: SubmitEvent) => {
    e?.preventDefault();
    if (!validate()) {
      return;
    }

    const data = getValues({ allFields: false });
    console.log(`Submit: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <>
      <div className="mb-8 flex space-x-5">
        <button onClick={() => setTab('detail')}>Detail</button>
        <button onClick={() => setTab('settings')}>Settings</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={clsx({ hidden: tab !== 'settings' })}>
          Some settings
        </div>
        <div className={clsx('space-y-8', { hidden: tab !== 'detail' })}>
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
                  console.log(`Name is changed: ${name}`);
                  if (name === 'a') {
                    setFieldValue('agree', true);
                  } else if (name === 'b') {
                    setFieldValue('agree', false);
                  }
                },
                validator: ({ name }) => {
                  if (!name) {
                    setTab('detail');
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
                  console.log('level is changed', level);
                },
              })}
            />
          </div>

          <div>
            {count % 3 === 1 && (
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
                    console.log('agree is changed:', agree);
                  },
                })}
              />
            )}
          </div>
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
      <div className="text-right">
        <Button onClick={() => handleSubmit} className="bg-amber-200">
          Submit
        </Button>
      </div>
    </>
  );
}
