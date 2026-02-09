import { IconWrapper, SvgIcon } from '@hanlogy/react-web-ui';

export function IconsPage() {
  return (
    <>
      <div>
        <div>SvgIcon and IconWrapper</div>
        <IconWrapper size="xlarge">
          <SvgIcon viewBox="0 0 10 10" className="text-green-700">
            <path d="M0 0H10V10H0Z" />
          </SvgIcon>
        </IconWrapper>
      </div>
    </>
  );
}
