describe('File upload', () => {

    it('Single file upload', () => {
        
        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php')
        const path1="gok.jpg"
        cy.get('#filesToUpload').attachFile(path1)

    });
    
});