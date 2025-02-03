{ pkgs, packages }:
with packages;
{
  system = [
    atomiutils
  ];

  dev = [
    pls
    git
    sg
  ];

  infra = [
    docker
  ];

  main = [
    # cyanprint
    bun
    infisical
  ];

  lint = [
    # core
    treefmt
    hadolint
    gitlint
    shellcheck
    sg
  ];


}
