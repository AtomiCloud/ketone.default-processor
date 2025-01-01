{ pkgs, atomi, pkgs-2411 }:
let
  all = {
    atomipkgs = (
      with atomi;
      {
        inherit
          sg
          pls;
      }
    );
    nix-2411 = (
      with pkgs-2411;
      {
        inherit
          infisical
          hadolint

          bun
          coreutils
          findutils
          sd
          bash
          git
          yq-go
          jq

          # lint
          treefmt
          gitlint
          shellcheck

          #infra
          docker;
      }
    );
  };
in
with all;
atomipkgs //
nix-2411
