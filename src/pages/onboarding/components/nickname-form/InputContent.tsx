import { NicknameFormType } from '../screen/NicknameFormScreen';
import NicknameFormControl from './NicknameFormControl';

interface InputContentProps {
  value: NicknameFormType;
  setValue: React.Dispatch<React.SetStateAction<NicknameFormType>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputContent({
  value,
  setValue,
  setDisabled,
}: InputContentProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-left text-gray-90 title-lg-300 md:text-center">
        당신의 이름을 알려주세요
      </h1>
      <NicknameFormControl
        value={value.name}
        onChange={handleInputChange}
        setSubmitDisabled={setDisabled}
      />
    </div>
  );
}
