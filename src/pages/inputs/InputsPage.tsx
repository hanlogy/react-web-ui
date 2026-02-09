import {
  TextInput,
  InputLabel,
  InputHelper,
  IconWrapper,
  IconButton,
  MultilineTextInput,
  InputError,
  CheckboxInput,
  SelectInput,
} from '@hanlogy/react-web-ui';
import {
  CheckBoxBlank,
  CheckBoxChecked,
  ChevronDown,
  CloseIcon,
  PersonIcon,
} from '../../components/icons';
import { useState } from 'react';

export function InputsPage() {
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <InputLabel className="text-gray-600">Name</InputLabel>
        <TextInput
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          prefix={
            <IconWrapper>
              <PersonIcon className="text-gray-500" />
            </IconWrapper>
          }
          suffix={
            name && (
              <IconButton
                onClick={() => setName('')}
                className="text-gray-600 hover:text-red-600"
              >
                <CloseIcon />
              </IconButton>
            )
          }
          placeholder="Your name"
          className="focus-within:ring-amber-200 border rounded-xl border-gray-300 bg-gray-100 focus-within:ring-2"
        />
        <InputHelper className="text-gray-500">
          Please enter your name
        </InputHelper>
      </div>

      <div>
        <InputLabel className="text-gray-600">Description</InputLabel>
        <MultilineTextInput
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
          placeholder="Some text.."
          className="ring-red-400 bg-red-50 border rounded-xl border-gray-300 ring-3"
        />
        <InputError className="text-red-500">Something wrong</InputError>
      </div>

      <div>
        <CheckboxInput
          onClick={() => setIsChecked((e) => !e)}
          icon={isChecked ? <CheckBoxChecked /> : <CheckBoxBlank />}
          className="text-blue-700"
          label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        />
      </div>

      <div>
        <InputLabel className="text-gray-600">Description</InputLabel>
        <SelectInput
          icon={<ChevronDown className="text-violet-600 w-6" />}
          className="border rounded-xl border-gray-300 focus-within:ring-green-200 focus-within:ring-2"
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </SelectInput>
        <InputHelper className="text-gray-500">Select an option</InputHelper>
      </div>
    </div>
  );
}
