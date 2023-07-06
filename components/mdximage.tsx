// components/MDXImage.js
export default function MDXImage({src, alt}) {
  return (
    <div className={`flex flex-col items-center pt-6`}>
      <img src={src} alt={alt} className={`w-full max-w-md mx-auto rounded-lg`} />
      <p className={`text-center text-gray-500 max-w-md`}>{alt}</p>
    </div>
  );
}
