import { SvgIcon } from '@hanlogy/react-web-ui';

export function HomeIcon({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </SvgIcon>
  );
}

export function PersonIcon({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
    </SvgIcon>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </SvgIcon>
  );
}

export function CheckBoxBlank({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
    </SvgIcon>
  );
}

export function CheckBoxChecked({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </SvgIcon>
  );
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </SvgIcon>
  );
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <SvgIcon viewBox="0 -960 960 960" className={className}>
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </SvgIcon>
  );
}
