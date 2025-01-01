import { ProcessorOutput, StartProcessorWithLambda } from '@atomicloud/cyan-sdk';
import { Eta } from 'eta';
import type { Eta as EtaType } from 'eta/dist/types/core';
import { EtaConfig } from 'eta/dist/types/config';

type Vars = Record<string, Vars | string>;
type Flags = Record<string, Flags | boolean>;

interface CyanInput {
  vars: Vars;
  flags: Flags;
  parser?: {
    varSyntax?: [string, string][];
    // flagSyntax?: [string, string][],
  };
}

StartProcessorWithLambda(async (input, fileHelper): Promise<ProcessorOutput> => {
  const cfg: CyanInput = input.config as CyanInput;

  const varEtaConfig: Partial<EtaConfig> = {
    useWith: true,
    tags: ['var__', '__'],
    autoTrim: [false, false],
    autoEscape: false,
    parse: {
      raw: '~',
      exec: '=',
      interpolate: '',
    },
  };

  const varSyntax = cfg.parser?.varSyntax ?? [];
  if (varSyntax.length === 0) varSyntax.push(['var__', '__']);

  const varEtaConfigs: Partial<EtaConfig>[] = varSyntax.map(
    s =>
      ({
        ...varEtaConfig,
        tags: s,
      }) satisfies Partial<EtaConfig>,
  );
  const varEtas: EtaType[] = varEtaConfigs.map(c => new Eta(c) as any as EtaType);

  const template = fileHelper.resolveAll();
  template
    .map(x => {
      x.content = varEtas.reduce((acc, eta) => eta.renderString(acc, cfg.vars ?? {}), x.content);
      x.relative = varEtas.reduce((acc, eta) => eta.renderString(acc, cfg.vars ?? {}), x.relative);
      return x;
    })
    .map(x => x.writeFile());

  return { directory: input.writeDir };
});
