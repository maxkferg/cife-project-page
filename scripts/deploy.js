let s3 = require('s3');
let awscred = require('awscred')


function loadCredentials() {
    // Return new promise for credentials
    return new Promise(function(resolve, reject) {
      awscred.loadCredentials(function(err, data) {
        if (err) reject(err);
        console.log("Got credentials: \n", data);
        resolve(data);
      });
    });
}


function createClient(credentials){
  return new Promise(function(resolve, reject) {
    let client = s3.createClient({
      maxAsyncS3: 20,     // this is the default
      s3RetryCount: 3,    // this is the default
      s3RetryDelay: 1000, // this is the default
      s3Options: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });

    let params = {
      localDir: "dist/",
      deleteRemoved: false,
      s3Params: {
        Bucket: "worksite-models",
        Prefix: "",
        ACL: "public-read"
      },
    };

    let uploader = client.uploadDir(params);
    resolve(uploader);
  });
}


function uploadPage(uploader){
  return new Promise(function(resolve,reject){
    uploader.on('progress', function() {
      if (uploader.progressAmount > 0){
        let amount = uploader.progressAmount / 1000;
        let total = uploader.progressTotal / 1000;
        console.log("Upload Progress: ", amount, "/",  total, "kb");
      }
    });

    // Resolve on success
    uploader.on('end', function() {
      console.log("Finished uploading");
      console.log("Access the site at http://worksite-models.s3-website-us-east-1.amazonaws.com/")
      resolve();
    });

    // Reject on error
    uploader.on('error', function(err) {
      console.error("Unable to sync:", err.stack);
      reject(err);
    });
  });
}

// Run the pipeline
loadCredentials().then(createClient).then(uploadPage);