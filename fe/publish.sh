#!/usr/bin/env bash

# publish
cd ./dist
tar -czvf health.tar.gz .

mkdir -p /work/fe/health
rm -rf /work/fe/health/*
cp health.tar.gz /work/fe/health
cd /work/fe/health && tar -xvf health.tar.gz