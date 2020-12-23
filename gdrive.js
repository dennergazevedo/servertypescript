const axios = require('axios');

const api = axios.create({
  baseURL: process.env.APIURL,
});

const fs = require('fs');
const { google } = require('googleapis');

function imageUpload(fileName, filePath, callback) {
  require('./gdrive-auth')(auth => {
    const fileMetadata = {
      name: fileName,
    };

    const media = {
      mimeType: 'image/x-coreldraw',
      body: fs.createReadStream(filePath),
    };

    const drive = google.drive({ version: 'v3', auth });
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id',
      },
      function(err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          callback(file.data.id);
        }
      }
    );
  });
}

function pdfUpload(fileName, filePath, callback) {
  require('./gdrive-auth')(auth => {
    const fileMetadata = {
      name: fileName,
    };

    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    };

    const drive = google.drive({ version: 'v3', auth });
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id',
      },
      function(err, file) {
        if (err) {
          console.error(err);
        } else {
          callback(file.data.id);
        }
      }
    );
  });
}

function rarUpload(fileName, filePath, callback) {
  require('./gdrive-auth')(auth => {
    const fileMetadata = {
      name: fileName,
    };

    const media = {
      mimeType: 'application/x-rar-compressed, application/octet-stream',
      body: fs.createReadStream(filePath),
    };

    const drive = google.drive({ version: 'v3', auth });
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id',
      },
      function(err, file) {
        if (err) {
          console.error(err);
        } else {
          callback(file.data.id);
        }
      }
    );
  });
}

async function downloadAll(url, nome) {
  const fileId = url;
  await require('./gdrive-auth')(async auth => {
    const dest = await fs.createWriteStream(`src/tmp/down/${nome}`);
    const drive = await google.drive({ version: 'v3', auth });
    drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' },
      async function(err, res) {
        await res.data
          .on('end', async () => {
            try {
              await api.put(`download_autorizado/${url}`, {
                download: 1,
              });
              console.log('certo');
            } catch (error) {
              console.log(error);
            }
          })
          .on('error', erro => {
            console.log(`Error ${erro}`);
          })
          .pipe(dest);
      }
    );
  });
}

module.exports = {
  imageUpload,
  pdfUpload,
  rarUpload,
  downloadAll,
};
