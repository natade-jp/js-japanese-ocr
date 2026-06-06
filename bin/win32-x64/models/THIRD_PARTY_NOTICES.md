## OCR models and dictionary

This package redistributes the following OCR model and dictionary files
included in the RapidOCR-json distribution:

* `ch_PP-OCRv3_det_infer.onnx`
* `ch_ppocr_mobile_v2.0_cls_infer.onnx`
* `rec_japan_PP-OCRv3_infer.onnx`
* `dict_japan.txt`

These files were obtained from the official RapidOCR-json distribution.

RapidOCR-json is based on RapidAI/RapidOcrOnnx. The model files appear to
be derived from PaddleOCR inference models and converted to ONNX format
for use with RapidOcrOnnx.

Relevant upstream projects:

* RapidOCR-json
* RapidAI/RapidOcrOnnx
* PaddlePaddle/PaddleOCR
* RapidAI/PaddleOCRModelConvert

The PaddleOCR project and PaddleOCRModelConvert are distributed under
the Apache License 2.0.

The model files are redistributed without modification.

See:

* `licenses/PaddleOCR-LICENSE.txt`
* `licenses/PaddleOCRModelConvert-LICENSE.txt`
* `licenses/RapidOcrOnnx-LICENSE.txt`
* `licenses/RapidOCR-json-LICENSE.txt`

The exact upstream commit or conversion process used to create the ONNX
files included in RapidOCR-json could not be identified from the
distribution metadata.
