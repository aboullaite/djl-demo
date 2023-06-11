package me.aboullaite.djldemo;

import ai.djl.ModelException;
import ai.djl.inference.Predictor;
import ai.djl.modality.audio.Audio;
import ai.djl.modality.audio.AudioFactory;
import ai.djl.translate.TranslateException;
import jakarta.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.util.function.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TranscriptionService {

  private static final Logger LOG = LoggerFactory.getLogger(TranscriptionService.class);


  @Resource
  private Supplier<Predictor<Audio, String>> predictorProvider;

  public String predict(InputStream stream) throws IOException, ModelException, TranslateException {
    Audio audio = AudioFactory.newInstance().fromInputStream(stream);

    try (var predictor = predictorProvider.get()) {
      return predictor.predict(audio);
      }
    }

}
