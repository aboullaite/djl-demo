package me.aboullaite.djldemo;

import ai.djl.modality.audio.Audio;
import ai.djl.ModelException;
import ai.djl.inference.Predictor;
import ai.djl.modality.audio.translator.SpeechRecognitionTranslatorFactory;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ZooModel;
import ai.djl.translate.TranslateException;
import java.io.IOException;
import java.util.function.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelConfiguration {

  private static final Logger LOG = LoggerFactory.getLogger(ModelConfiguration.class);

  @Bean
  public ZooModel<Audio, String> loadModel() throws IOException, ModelException, TranslateException {
    // Load model.
    // Wav2Vec2 model is a speech model that accepts a float array corresponding to the raw
    // waveform of the speech signal.
    String url = "https://resources.djl.ai/test-models/pytorch/wav2vec2.zip";
    Criteria<Audio, String> criteria =
        Criteria.builder()
            .setTypes(Audio.class, String.class)
            .optModelUrls(url)
            .optTranslatorFactory(new SpeechRecognitionTranslatorFactory())
            .optModelName("wav2vec2.ptl")
            .optEngine("PyTorch")
            .build();

    return criteria.loadModel();
  }

  @Bean
  public Supplier<Predictor<Audio, String>> predictorProvider(ZooModel<Audio, String> model) {
    return model::newPredictor;
  }

}
