// Serviço de imagens do site: o Sharp do Astro com qualidade padrão 90.
//
// As imagens do portfólio são capturas de tela com texto, e no padrão do Sharp
// (80) as letras borram. A qualidade é preenchida nas opções de cada imagem (e não
// só na configuração do serviço) porque as opções entram no hash do nome do arquivo:
// assim, mudar a qualidade gera arquivos novos e nenhum cache antigo é reaproveitado.
import type { LocalImageService } from 'astro';
import sharpService from 'astro/assets/services/sharp';

const QUALIDADE_PADRAO = 90;

const servico: LocalImageService = {
  ...sharpService,
  async validateOptions(options, config) {
    const validadas = sharpService.validateOptions ? await sharpService.validateOptions(options, config) : options;
    return { ...validadas, quality: validadas.quality ?? QUALIDADE_PADRAO };
  },
};

export default servico;
