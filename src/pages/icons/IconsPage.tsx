import { IconContainer, SvgIcon } from '@hanlogy/react-ui';

export function IconsPage() {
  return (
    <>
      <div>
        <div>SvgIcon and IconContainer</div>
        <IconContainer size="xlarge">
          <SvgIcon viewBox="0 0 10 10" className="text-green-700">
            <path d="M0 0H10V10H0Z" />
          </SvgIcon>
        </IconContainer>
      </div>
    </>
  );
}
