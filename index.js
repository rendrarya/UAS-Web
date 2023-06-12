const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Mengizinkan semua domain
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(cors());

// Endpoint untuk membuat data
app.post('/api/create', (req, res) => {
  const { id_barang,nama_barang, harga_barang ,gambar_barang , merek_barang} = req.body;

  if (id_barang && nama_barang && harga_barang && gambar_barang && merek_barang) {
    const data = {
      id_barang,
      nama_barang,
      harga_barang,
      gambar_barang,
      merek_barang,
    };

    // Lakukan operasi create di database menggunakan nilai data
    db.query('INSERT INTO bahan_makanan SET ?', data, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating data in database" });
      } else {
        res.status(200).json({ message: "Data created successfully" });
      }
    });
  } else {
    res.status(400).json({ message: "Invalid data format" });
  }
});

// Endpoint untuk membaca data
app.get('/api/read', (req, res) => {
  // Lakukan operasi read di database
  db.query('SELECT * FROM bahan_makanan', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error reading data from database" });
    } else {
      const data = results;
      res.status(200).json(data);
    }
  });
});
app.post('/api/readata', (req, res) => {
  // Lakukan operasi read di database
  const { nama_barang} = req.body;
  const nama = {nama_barang};
  db.query('SELECT * FROM bahan_makanan WHERE ?',nama, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error reading data from database" });
    } else {
      console.log(results);
      const data = results;
      res.status(200).json(data);
    }
  });
});

// Endpoint untuk memperbarui data
app.put('/api/update', (req, res) => {
  const { id_makanan,nama_barang} = req.body;

  if (nama_barang && id_makanan ) {
    const data = {
      nama_barang,
    }
   
    db.query('UPDATE bahan_makanan SET nama_barang =? WHERE id_makanan = ?', [nama_barang,id_makanan], (error, results) => {
      console.log([data,id_makanan])
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating data in database" });
      } else {
        res.status(200).json({ message: "Data Update successfully" });
      }
    });
  } else {
    res.status(400).json({ message: "Invalid data format" });
  }
});

// Endpoint untuk menghapus data
app.delete('/api/delete', (req, res) => {
  const { id_makanan} = req.body;
  const id = {id_makanan};
  
  db.query('DELETE FROM bahan_makanan WHERE ?', id, (error, results) => { 
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating data in database" });
    } else {
      res.status(200).json({ message: "Data Deleted successfully" });
    }
  });
  }  
);

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
