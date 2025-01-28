export const Footer = () => {
  return (
    <div className="layout__container py-14">
      <p className="text-center text-primary-red text-base xs:text-sm">
        &copy; {new Date().getFullYear()} DeSci NG. Join us in shaping the
        future of science and academia
      </p>
    </div>
  );
};
