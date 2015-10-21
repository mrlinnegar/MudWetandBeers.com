var s3 = require('s3');

var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.MWAB_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MWAB_AWS_SECRET_ACCESS_KEY,
    region: process.env.MWAB_AWS_BUCKET_REGION,
  }
});

var params = {
  localDir: "build",
  deleteRemoved: true,
  s3Params: {
    Bucket: process.env.MWAB_AWS_BUCKET
  },
};

var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});
