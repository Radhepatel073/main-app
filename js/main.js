// PhotoResize Main JavaScript File
class PhotoResize {
    constructor() {
        this.selectedImage = null;
        this.originalImage = null;
        this.dimensions = { width: 0, height: 0 };
        this.newDimensions = { width: 0, height: 0 };
        this.imageState = {
            rotation: 0,
            flipHorizontal: false,
            flipVertical: false,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0
        };
        this.quality = 90;
        this.format = 'jpeg';
        this.maintainAspectRatio = true;
        
        this.init();
    }

    init() {
        this.initializeElements();
        this.bindEvents();
        this.initializeLucideIcons();
    }

    initializeElements() {
        // Get DOM elements
        this.landingPage = document.getElementById('landingPage');
        this.editorPage = document.getElementById('editorPage');
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.processCanvas = document.getElementById('processCanvas');
        
        // Controls
        this.widthInput = document.getElementById('widthInput');
        this.heightInput = document.getElementById('heightInput');
        this.aspectRatioCheckbox = document.getElementById('aspectRatio');
        this.originalDimensions = document.getElementById('originalDimensions');
        
        // Sliders
        this.rotationSlider = document.getElementById('rotationSlider');
        this.brightnessSlider = document.getElementById('brightnessSlider');
        this.contrastSlider = document.getElementById('contrastSlider');
        this.saturationSlider = document.getElementById('saturationSlider');
        this.hueSlider = document.getElementById('hueSlider');
        this.blurSlider = document.getElementById('blurSlider');
        this.qualitySlider = document.getElementById('qualitySlider');
        
        // Value displays
        this.rotationValue = document.getElementById('rotationValue');
        this.brightnessValue = document.getElementById('brightnessValue');
        this.contrastValue = document.getElementById('contrastValue');
        this.saturationValue = document.getElementById('saturationValue');
        this.hueValue = document.getElementById('hueValue');
        this.blurValue = document.getElementById('blurValue');
        this.qualityValue = document.getElementById('qualityValue');
        
        // Buttons
        this.downloadBtn = document.getElementById('downloadBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.newImageBtn = document.getElementById('newImageBtn');
        this.sampleImageBtn = document.getElementById('sampleImageBtn');
        
        // Format select
        this.formatSelect = document.getElementById('formatSelect');
    }

    bindEvents() {
        // File upload events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        this.fileInput.addEventListener('change', this.handleFileUpload.bind(this));
        
        // Sample image button
        this.sampleImageBtn.addEventListener('click', this.loadSampleImage.bind(this));
        
        // Dimension inputs
        this.widthInput.addEventListener('input', () => this.handleDimensionChange('width'));
        this.heightInput.addEventListener('input', () => this.handleDimensionChange('height'));
        this.aspectRatioCheckbox.addEventListener('change', (e) => {
            this.maintainAspectRatio = e.target.checked;
        });
        
        // Rotation buttons
        document.getElementById('rotate90').addEventListener('click', () => this.rotateImage(90));
        document.getElementById('rotateNeg90').addEventListener('click', () => this.rotateImage(-90));
        document.getElementById('flipH').addEventListener('click', () => this.flipImage('horizontal'));
        document.getElementById('flipV').addEventListener('click', () => this.flipImage('vertical'));
        
        // Sliders
        this.rotationSlider.addEventListener('input', this.handleRotationSlider.bind(this));
        this.brightnessSlider.addEventListener('input', this.handleBrightnessSlider.bind(this));
        this.contrastSlider.addEventListener('input', this.handleContrastSlider.bind(this));
        this.saturationSlider.addEventListener('input', this.handleSaturationSlider.bind(this));
        this.hueSlider.addEventListener('input', this.handleHueSlider.bind(this));
        this.blurSlider.addEventListener('input', this.handleBlurSlider.bind(this));
        this.qualitySlider.addEventListener('input', this.handleQualitySlider.bind(this));
        
        // Format select
        this.formatSelect.addEventListener('change', (e) => {
            this.format = e.target.value;
        });
        
        // Action buttons
        this.downloadBtn.addEventListener('click', this.processAndDownload.bind(this));
        this.resetBtn.addEventListener('click', this.resetImage.bind(this));
        this.newImageBtn.addEventListener('click', this.showLandingPage.bind(this));
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', this.switchTab.bind(this));
        });
        
        // Modal events
        this.bindModalEvents();
    }

    bindModalEvents() {
        // About modal
        const aboutBtn = document.getElementById('aboutBtn');
        const aboutModal = document.getElementById('aboutModal');
        const closeAboutModal = document.getElementById('closeAboutModal');
        
        aboutBtn.addEventListener('click', () => {
            aboutModal.classList.remove('hidden');
        });
        
        closeAboutModal.addEventListener('click', () => {
            aboutModal.classList.add('hidden');
        });
        
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
        });
        
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
        
        // Close modals on backdrop click
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.add('hidden');
            }
        });
        
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    initializeLucideIcons() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('border-blue-400', 'bg-blue-50');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('border-blue-400', 'bg-blue-50');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('border-blue-400', 'bg-blue-50');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            this.processImageFile(files[0]);
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.processImageFile(file);
        }
    }

    processImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.selectedImage = e.target.result;
                this.dimensions = { width: img.width, height: img.height };
                this.newDimensions = { width: img.width, height: img.height };
                this.resetImageState();
                this.showEditorPage();
                this.updatePreview();
                this.updateUI();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    loadSampleImage() {
        // Create a sample image (you can replace this with an actual sample image URL)
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        
        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, 600, 400);
        gradient.addColorStop(0, '#3B82F6');
        gradient.addColorStop(1, '#10B981');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 400);
        
        // Add some text
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Sample Image', 300, 200);
        ctx.font = '24px Arial';
        ctx.fillText('600 × 400 pixels', 300, 240);
        
        const dataURL = canvas.toDataURL();
        
        const img = new Image();
        img.onload = () => {
            this.originalImage = img;
            this.selectedImage = dataURL;
            this.dimensions = { width: 600, height: 400 };
            this.newDimensions = { width: 600, height: 400 };
            this.resetImageState();
            this.showEditorPage();
            this.updatePreview();
            this.updateUI();
        };
        img.src = dataURL;
    }

    showEditorPage() {
        this.landingPage.classList.add('hidden');
        this.editorPage.classList.remove('hidden');
    }

    showLandingPage() {
        this.editorPage.classList.add('hidden');
        this.landingPage.classList.remove('hidden');
        this.selectedImage = null;
        this.originalImage = null;
    }

    resetImageState() {
        this.imageState = {
            rotation: 0,
            flipHorizontal: false,
            flipVertical: false,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0
        };
    }

    updateUI() {
        // Update dimension inputs
        this.widthInput.value = this.newDimensions.width;
        this.heightInput.value = this.newDimensions.height;
        this.originalDimensions.textContent = `Original: ${this.dimensions.width} × ${this.dimensions.height} pixels`;
        
        // Update sliders
        this.rotationSlider.value = this.imageState.rotation;
        this.brightnessSlider.value = this.imageState.brightness;
        this.contrastSlider.value = this.imageState.contrast;
        this.saturationSlider.value = this.imageState.saturation;
        this.hueSlider.value = this.imageState.hue;
        this.blurSlider.value = this.imageState.blur;
        this.qualitySlider.value = this.quality;
        
        // Update value displays
        this.rotationValue.textContent = this.imageState.rotation;
        this.brightnessValue.textContent = this.imageState.brightness;
        this.contrastValue.textContent = this.imageState.contrast;
        this.saturationValue.textContent = this.imageState.saturation;
        this.hueValue.textContent = this.imageState.hue;
        this.blurValue.textContent = this.imageState.blur;
        this.qualityValue.textContent = this.quality;
    }

    handleDimensionChange(dimension) {
        const value = parseInt(dimension === 'width' ? this.widthInput.value : this.heightInput.value) || 0;
        
        if (this.maintainAspectRatio && this.dimensions.width && this.dimensions.height) {
            const aspectRatio = this.dimensions.width / this.dimensions.height;
            if (dimension === 'width') {
                this.newDimensions.width = value;
                this.newDimensions.height = Math.round(value / aspectRatio);
                this.heightInput.value = this.newDimensions.height;
            } else {
                this.newDimensions.height = value;
                this.newDimensions.width = Math.round(value * aspectRatio);
                this.widthInput.value = this.newDimensions.width;
            }
        } else {
            this.newDimensions[dimension] = value;
        }
    }

    rotateImage(degrees) {
        this.imageState.rotation = (this.imageState.rotation + degrees) % 360;
        if (this.imageState.rotation < 0) this.imageState.rotation += 360;
        this.updatePreview();
        this.updateUI();
    }

    flipImage(direction) {
        if (direction === 'horizontal') {
            this.imageState.flipHorizontal = !this.imageState.flipHorizontal;
        } else {
            this.imageState.flipVertical = !this.imageState.flipVertical;
        }
        this.updatePreview();
    }

    handleRotationSlider(e) {
        this.imageState.rotation = parseInt(e.target.value);
        this.rotationValue.textContent = this.imageState.rotation;
        this.updatePreview();
    }

    handleBrightnessSlider(e) {
        this.imageState.brightness = parseInt(e.target.value);
        this.brightnessValue.textContent = this.imageState.brightness;
        this.updatePreview();
    }

    handleContrastSlider(e) {
        this.imageState.contrast = parseInt(e.target.value);
        this.contrastValue.textContent = this.imageState.contrast;
        this.updatePreview();
    }

    handleSaturationSlider(e) {
        this.imageState.saturation = parseInt(e.target.value);
        this.saturationValue.textContent = this.imageState.saturation;
        this.updatePreview();
    }

    handleHueSlider(e) {
        this.imageState.hue = parseInt(e.target.value);
        this.hueValue.textContent = this.imageState.hue;
        this.updatePreview();
    }

    handleBlurSlider(e) {
        this.imageState.blur = parseFloat(e.target.value);
        this.blurValue.textContent = this.imageState.blur;
        this.updatePreview();
    }

    handleQualitySlider(e) {
        this.quality = parseInt(e.target.value);
        this.qualityValue.textContent = this.quality;
    }

    updatePreview() {
        if (!this.originalImage || !this.previewCanvas) return;

        const canvas = this.previewCanvas;
        const ctx = canvas.getContext('2d');
        const img = this.originalImage;

        // Calculate canvas size based on rotation
        const isRotated = this.imageState.rotation % 180 !== 0;
        canvas.width = isRotated ? img.height : img.width;
        canvas.height = isRotated ? img.width : img.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Save context
        ctx.save();

        // Move to center
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Apply transformations
        ctx.rotate((this.imageState.rotation * Math.PI) / 180);
        ctx.scale(
            this.imageState.flipHorizontal ? -1 : 1,
            this.imageState.flipVertical ? -1 : 1
        );

        // Apply filters
        ctx.filter = `
            brightness(${this.imageState.brightness}%)
            contrast(${this.imageState.contrast}%)
            saturate(${this.imageState.saturation}%)
            hue-rotate(${this.imageState.hue}deg)
            blur(${this.imageState.blur}px)
        `;

        // Draw image
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // Restore context
        ctx.restore();
    }

    processAndDownload() {
        if (!this.originalImage || !this.processCanvas) return;

        this.downloadBtn.textContent = 'Processing...';
        this.downloadBtn.disabled = true;

        setTimeout(() => {
            const canvas = this.processCanvas;
            const ctx = canvas.getContext('2d');
            const img = this.originalImage;

            // Set canvas size to new dimensions
            canvas.width = this.newDimensions.width;
            canvas.height = this.newDimensions.height;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Save context
            ctx.save();

            // Move to center
            ctx.translate(canvas.width / 2, canvas.height / 2);

            // Apply transformations
            ctx.rotate((this.imageState.rotation * Math.PI) / 180);
            ctx.scale(
                this.imageState.flipHorizontal ? -1 : 1,
                this.imageState.flipVertical ? -1 : 1
            );

            // Apply filters
            ctx.filter = `
                brightness(${this.imageState.brightness}%)
                contrast(${this.imageState.contrast}%)
                saturate(${this.imageState.saturation}%)
                hue-rotate(${this.imageState.hue}deg)
                blur(${this.imageState.blur}px)
            `;

            // Calculate scaling to fit new dimensions
            const scaleX = this.newDimensions.width / img.width;
            const scaleY = this.newDimensions.height / img.height;
            const scale = Math.min(scaleX, scaleY);

            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            // Draw image
            ctx.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);

            // Restore context
            ctx.restore();

            // Download the image
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `photoresize-${Date.now()}.${this.format}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
                
                this.downloadBtn.innerHTML = '<i data-lucide="download" class="w-5 h-5 mr-2 inline"></i>Download Processed Image';
                this.downloadBtn.disabled = false;
                lucide.createIcons();
            }, `image/${this.format}`, this.quality / 100);
        }, 100);
    }

    resetImage() {
        this.resetImageState();
        this.newDimensions = { ...this.dimensions };
        this.updatePreview();
        this.updateUI();
    }

    switchTab(e) {
        const tabName = e.target.dataset.tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active', 'border-blue-500', 'text-blue-600');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        
        e.target.classList.add('active', 'border-blue-500', 'text-blue-600');
        e.target.classList.remove('border-transparent', 'text-gray-500');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        document.getElementById(tabName + 'Tab').classList.remove('hidden');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotoResize();
});
