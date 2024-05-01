exports.handler = async (event) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const origin = request.origin;
  const originBucketVitrineVirtual =
    "lambda-edge-example-vitrine-virtual.s3.amazonaws.com";
  const originBucketVitrineDefault =
    "lambda-edge-example-vitrine-default.s3.amazonaws.com";

  if (headers.cookie) {
    for (const element of headers.cookie) {
      if (element.value.indexOf("origin=vitrineVirtual") >= 0) {
        console.log("Origin vitrineVirtual");
        headers["host"] = [
          {
            key: "host",
            value: originBucketVitrineVirtual,
          },
        ];
        origin.s3.domainName = originBucketVitrineVirtual;
        break;
      } else if (element.value.indexOf("origin=vitrineDefault") >= 0) {
        console.log("Origin vitrineDefault");
        headers["host"] = [
          {
            key: "host",
            value: originBucketVitrineDefault,
          },
        ];
        origin.s3.domainName = originBucketVitrineDefault;
        break;
      }
    }
  }

  return request;
};
