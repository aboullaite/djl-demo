package me.aboullaite.djldemo;

import ai.djl.ModelException;
import ai.djl.translate.TranslateException;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PredictionController {
  private static final Logger LOG = LoggerFactory.getLogger(PredictionController.class);
  @Autowired
  TranscriptionService service;

  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping("/transcribe")
  String predict(@RequestParam("audio") MultipartFile file){
    try {
      return service.predict(file.getInputStream());
    } catch (IOException e) {
      LOG.error("Something went wrong.", e);
    } catch (ModelException e) {
      LOG.error("Something went wrong.", e);
    } catch (TranslateException e) {
      LOG.error("Something went wrong.", e);
    }
    return "Should not reach here!";
  }
}
