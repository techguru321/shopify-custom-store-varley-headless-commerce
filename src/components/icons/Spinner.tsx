export default function SpinnerIcon() {
  return (
    <div className="active loader-wrapper w-full">
      <div className="loader"></div>
      <div className="fixed top-0 left-0 block h-[100vh] w-[100vw] bg-[#00000020]"></div>
    </div>
  );
}
