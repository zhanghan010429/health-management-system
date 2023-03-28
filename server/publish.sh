#!/usr/bin/env bash

# publish
tar -czvf health.tar.gz .

mkdir -p /work/api/health
rm -rf /work/api/health/*
cp health.tar.gz /work/api/health
cd /work/api/health && tar -xvf health.tar.gz && npm --registry=https://registry.npm.taobao.org install && pm2 stop pm2.json && pm2 start pm2.json
