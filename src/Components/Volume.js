export default function Volume({ url, alt }) {
  return (
    <img src={url} alt={alt} className="z-99 w-12 absolute bottom-5 left-2" />
  );
}
