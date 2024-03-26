import 'bootstrap/dist/css/bootstrap.min.css';
 
import React, { useState } from 'react';
import './file.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../image/logo2.png'
 
const UploadFiles = () => {

    const formData = new FormData();


    const [responseMessage, setResponseMessage] = useState('');
 
    const uploadPdfWordFiles = async () => { 

        if(formData.length === undefined){  
        const files = document.getElementById('pdfWordInput').files; 
        for (let i = 0; i < files.length; i++) {
            
            formData.append('pdfWordFile', files[i]);
        }
    }
    
        try {
            const response = await fetch('http://3.27.111.54:8080/getExcelByPdf', {
                method: 'POST',
                body: formData
            });
 
            if (!response.ok) {
                throw new Error('Error uploading PDF/Word files');
            }
 
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ConvertedExcel.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); 
            setResponseMessage('PDF/Word files uploaded and converted successfully!');
            // setTimeout(() => {
            //     // Clear response message after 2 seconds
               
            // }, 5000);
          
             // Refresh the page
             window.location.reload();

        } catch (error) {
            setResponseMessage(error.message);
        }
    };
   
    const uploadExcelFiles = async () => {
        const files = document.getElementById('excelInput').files;
        const formData = new FormData();
 
        for (let i = 0; i < files.length; i++) {
            formData.append('excelFiles', files[i]);
        }
 
        try {
            const response = await fetch('http://3.27.111.54:8080/meargeExcelFiles', {
                method: 'POST',
                body: formData
            });
 
            if (!response.ok) {
                throw new Error('Error merging Excel files');
            }
 
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'MergedExcel.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            // Refresh the page
            window.location.reload();
            setResponseMessage('Excel files merged and downloaded successfully!');
        } catch (error) {
            setResponseMessage(error.message);
        }
    };

    // const validateFiles = (event) => {
    //     const validExtensions = ['.PDF', '.doc', '.docx', '.pdf'];
    //     const files = event.target.files;
    
    //     for (let i = 0; i < files.length; i++) {
    //       const fileExtension = '.' + files[i].name.split('.').pop();

    //       console.error(fileExtension);

    //       formData.append('pdfWordFile', files[i]);


    //       if (!validExtensions.includes(fileExtension)) {
    //         alert('Please select only .pdf, .doc, or .docx files.');
    //         event.target.value = ''; // Clear the selected files
    //         return;
    //       }
    //     }
    //     uploadPdfWordFiles();
    // }

    // const validateFiles = (event) => {
    //     const validExtensions = ['.PDF', '.doc', '.docx', '.pdf'];
    //     const files = event.target.files;
    
    //     for (let i = 0; i < files.length; i++) {
    //       const fileExtension = '.' + files[i].name.split('.').pop();
    
    //       formData.append('pdfWordFile', files[i]);
    
    //       if (!validExtensions.includes(fileExtension)) {
    //         alert('Please select only .pdf, .doc, or .docx files.');
    //         event.target.value = ''; // Clear the selected files
    //         return;
    //       }
    //     }
    //     uploadPdfWordFiles();
    //   }
    
     

      const handleFolderSelection = (event) => {
        selectedFiles = Array.from(event.target.files);
      }
      var selectedFiles = [];
      const uploadPdfWordFolder = async () => {  

        const validExtensions = ['.PDF', '.doc', '.docx', '.pdf']; 
    
        for (let i = 0; i < selectedFiles.length; i++) { 
            console.error(selectedFiles[i]) 
          const fileExtension = '.' + selectedFiles[i].name.split('.').pop();
        //   console.log(selectedFiles[i] + "lalala")
        //   if('.docx'.includes(fileExtension)){
        //      // Remove the file name and append '/' 
        // const fileName = selectedFiles[i].name.split('/').pop();
        // selectedFiles.delete('name');
        // selectedFiles.append('name', fileName);
        //   }

          if (!validExtensions.includes(fileExtension)) {
            alert('Please select only .pdf, .doc, or .docx files.');
            return;
          }
          
          formData.append('pdfWordFile', selectedFiles[i]);
        }
    
        uploadPdfWordFiles();
      };
    return (
        <div className='cont container-fluid'>
            <div className='card-div row'>
                <div className=' col-md-6 text-center d-flex flex-column justify-content-center cont1' >
                <img src={logo} alt='img' className='img-logo'/>
                </div>
                <div  className='col-sm-12 col-md-6 text-center d-flex flex-column justify-content-center cont1 cont2'>
                     <h2 className='main-heading'>Upload Files</h2>
                     <img src='https://i.pinimg.com/originals/04/54/7c/04547c2b354abb70a85ed8a2d1b33e5f.png' alt='img' className='img-upload'/>
                     <form id="uploadForm" encType="multipart/form-data">
           
                      <input type="file" id="pdfWordInput" name="pdfWordFile" multiple accept=".pdf,.doc,.docx" className='input-ele'/>
               
                     <div className='div-btn'>
                        <button type="button" onClick={uploadPdfWordFiles} className='btn-upload btn btn-success'>Upload PDF/Word</button>
                     </div>
               
               
                <input type="file" id="excelInput" name="excelFile" className='input-ele' multiple accept=".xlsx,.xls" />
               
                <div className='div-btn'>
                <button type="button" onClick={uploadExcelFiles} className='btn-upload btn btn-success'>Upload Excel</button>
                </div>

            <br></br>
          
            {/* <input type="file" id="folderInput" name="folderFiles" directory="" webkitdirectory="" className="input-ele" onChange={ validateFiles}   />  */}

            <input type="file" id="folderInput" name="folderFiles" directory="" webkitdirectory="" className="input-ele" onChange={handleFolderSelection} multiple />

<div className="div-btn">
  <button type="button" onClick={uploadPdfWordFolder} className="btn-upload btn btn-success">Upload Folder</button>
</div>

            </form>
            <div id="response">{responseMessage}</div></div>
                </div>
               
           
            </div>
       
    );
};
 
export default UploadFiles;