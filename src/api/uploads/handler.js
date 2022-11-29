class UploadsHandler {
  constructor(controllers, validator) {
    this._controlles = controllers;
    this._validator = validator;

    this.updateProfileImgHandler = this.updateProfileImgHandler.bind(this);
  }

  async updateProfileImgHandler(request) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    const fileUrl = await this._controlles.uploadProfilePhoto(data);
   
    return {
      status: 'success',
      message: 'successfully upload image',
      data: {
        fileUrl,
      },
    };
  }
}

module.exports = UploadsHandler;
